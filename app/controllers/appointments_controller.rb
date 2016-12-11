class AppointmentsController < ApplicationController
    
    include ApplicationHelper
    
    before_action :check_authorization, :get_hmo_list
    
    def index
        if params[:filter].present?
            @appointments = Appointment.get_appointments(params[:filter])
        else
            if params[:type].present?
                @appointments = Appointment.get_filtered_appointments(params)
            else
                @appointments = Appointment.all.order(consultation_date: :desc)
            end
        end
    end
    
    def new 
        @appointment = Appointment.new
    end
    
    def create

        @type = "appointment";

        if !Appointment.save_appointment(appointment_params, @type).nil?
            flash[:success] = "Appointment successfully created"
            redirect_to appointments_path
        end
    
    end
    
    def edit
        @appointment = Appointment.find(params[:id])
    end
    
    def update
       @appointment = Appointment.find(params[:id])
        
        if @appointment.update(update_appointment_params)
            flash[:success] = "Appointment successfully updated."
            redirect_to appointments_path
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

    def get_hmo_list
        @hmo = HealthMaintenanceOrganization.all
    end

    def filter_params
        params.require(:filter).permit(:record_date, :start, :end, :type, :status)
    end

    def appointment_params
        params.require(:patient).permit(:hmo_id, :last_name, :first_name, :middle_name, :birth_date, :gender, :age, :civil_status, :address, :contact, :occupation, :blood_type, :height, :weight,
            appointments: [:patient_id, :consultation_date, :systolic, :diastolic, :weight, :complaint, :status, :appointment_type],
            medical_record: [:menarche, :gravida, :para, :t, :p, :a, :l, :ob_history, :type, :lmr, :edc, :chief_complaint, :history_of_present_illness, :return_visit, :record_date, :management, :recommendations],
            patient_attachments: [:id, :document, :type, :file_name])
    end
    
    def update_appointment_params
        params.require(:appointment).permit(:patient_id, :consultation_date, :systolic, :diastolic, :weight, :complaint, :status)

    end
    
end
