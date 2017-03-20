class AppointmentsController < ApplicationController
    
    include ApplicationHelper
    
    before_action :check_authorization, :get_hmo_list, :get_user

    def index

        if params[:filter].present?
            @appointments = Appointment.get_appointments(params[:filter])
        else
            if params[:type].present?
                @appointments = Appointment.get_filtered_appointments(params)
            else
                @appointments = Appointment.where("consultation_date >= ? AND status != ? AND status != ?", Date.yesterday, 2, 3).order(consultation_date: :desc)
            end
        end

    end
    
    def new 
        @appointment = Appointment.new
        @appointment.medical_records = medical_records_params
    end
    
    def create

        @type = "appointment";

#        render json: appointment_params
        
        if !Appointment.save_appointment(appointment_params, @type).nil?

            flash[:success] = "Appointment successfully created"
            redirect_to appointments_path(filter: "today")
        end

    end
    
    def edit
        @appointment = Appointment.find(params[:id])

#        render json: @appointment
        
        if @appointment.appointment_type == "return_visit"
            @appointment_prev = Appointment.find(@appointment.parent_id)
        end

    end

    def return_visit
        @return_visits = Appointment.where(parent_id: params[:id])

    end

    def update
       @appointment = Appointment.find(params[:id])


       # render json: update_appointment_params

        if @appointment.update(update_appointment_params)

            if !update_appointment_params[:medical_records][:return_visit].blank?
                @patient_id = @appointment.patient_id

                if @appointment.appointment_type == "appointment"
                     #check_return_visit_is_present(update_appointment_params[:medical_records][:return_visit], @appointment.patient_id).blank?

                    if check_return_visit_is_present(update_appointment_params[:medical_records][:return_visit], @appointment.patient_id).blank?
                        Appointment.create_return_visit(update_appointment_params[:medical_records][:return_visit], @patient_id , params[:id])
                        flash[:success] = "Appointment successfully updated."
                        redirect_to appointments_path
                    else
                        flash[:error] = "This patient has already scheduled an appointment for this date."
                        redirect_to edit_appointment_path(params[:id])
                    end
                else
                    @parent_id = @appointment.parent_id

                    if check_return_visit_is_present(update_appointment_params[:medical_records][:return_visit], @appointment.patient_id).blank?
                        Appointment.create_return_visit(update_appointment_params[:medical_records][:return_visit], @patient_id, @parent_id)
                        flash[:success] = "Appointment successfully updated."
                        redirect_to appointments_path
                    else
                        flash[:error] = "This patient has already scheduled an appointment for this date."
                        redirect_to edit_appointment_path(params[:id])
                    end
                end

            else
                flash[:success] = "Appointment successfully updated."
                
                if @appointment.consultation_date.to_date == Date.today 
                    redirect_to appointments_path(filter: "today")
                elsif @appointment.consultation_date.to_date == Date.yesterday  
                    redirect_to appointments_path(filter: "yesterday")
                else
                    redirect_to appointments_path
                end
            end


        end
    end
    
    def history
        if params[:date].present? || params[:month].present?
            @appointments = Appointment.get_patient_by_time_period(params)
        else
            @appointments = Appointment.where('status <> ?', 0).order(:created_at)
        end
    end

    def filter_appointment
        if filter_params[:record_date].present?
            redirect_to appointments_path(record_date: filter_params[:record_date], type: filter_params[:type], status: filter_params[:status])
        else
            redirect_to appointments_path(start: filter_params[:start], end: filter_params[:end], type: filter_params[:type], status: filter_params[:status])
        end
    end

    private

    def get_user
        @patients = Patient.all
    end

    def check_return_visit_is_present(date, patient_id)
        @appointment = Appointment.where('consultation_date = ? AND patient_id = ?', DateTime.parse(date), patient_id)

        if !@appointment.nil?
            return @appointment
        else
            return nil
        end

    end

    def get_hmo_list
        @hmo = HealthMaintenanceOrganization.all
    end

    def medical_records_params
        medical_records = { menarche: "", gravida: 0, para: 0, t: 0, p: 0, a: 0, l: 0, ob_history: "", type: "ob", lmp: "", edc: "", aog: "", chief_complaint: "", history_of_present_illness: "", return_visit: "", diagnosis: "", past_medical_history: "", laboratory_results: "", physical_examinations: ""}

        return medical_records
    end

    def filter_params
        params.require(:filter).permit(:record_date, :start, :end, :type, :status)
    end

    def appointment_params

        params.require(:patient).permit(:hmo_id, :last_name, :first_name, :middle_name, :birth_date, :gender, :age, :civil_status, :address, :contact, :occupation, :blood_type, :height, :weight,
            appointments: [:patient_id, :consultation_date, :systolic, :diastolic, :weight, :complaint, :status, :appointment_type, :record_date, :management, :recommendations, :summary,
            medical_records: [:menarche, :gravida, :para, :t, :p, :a, :l, :ob_history, :type, :lmp, :edc, :aog, :chief_complaint, :history_of_present_illness, :return_visit, :diagnosis, :past_medical_history, :laboratory_results, :physical_examinations]],
            patient_attachments: [:id, :document, :type, :file_name])

    end
    
    def update_appointment_params
        params.require(:appointment).permit(:patient_id, :consultation_date, :systolic, :diastolic, :weight, :complaint, :status, :management, :recommendations, :summary, medical_records: [:menarche, :gravida, :para, :t, :p, :a, :l, :ob_history, :type, :lmp, :edc, :aog, :chief_complaint, :history_of_present_illness, :return_visit, :record_date, :management, :recommendations, :diagnosis, :past_medical_history, :laboratory_results, :physical_examinations])

    end
    
end
