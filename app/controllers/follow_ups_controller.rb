class FollowUpsController < ApplicationController
    
    before_action :get_user
    
    def index
        @follow_ups = Appointment.all  #get_todays_appointments

    end
    
    def new 
        @appointment = Appointment.new
        @appointment.medical_records = medical_records_params
    end
    
    def create
#        render json: appointment_params
        # render json: Patient.get_patient_latest_complete_appointment_by_patient_id(appointment_params[:patient_id])

        appointment_type = "return_visit";

        if check_return_visit_is_present(appointment_params[:consultation_date], appointment_params[:patient_id]).blank?

            if !Appointment.save_follow_up_appointment_main(appointment_params, appointment_type).nil?
                flash[:success] = "Appointment successfully created"
                redirect_to appointments_path(filter: "today")
            end
        else
            flash[:error] = "This patient has already scheduled an appointment for this date."
            redirect_to new_follow_up_path
        end

    end
    
    private

    def medical_records_params
        medical_records = { menarche: "", gravida: 0, para: 0, t: 0, p: 0, a: 0, l: 0, ob_history: "", type: "ob", lmp: "", edc: "", aog: "", chief_complaint: "", history_of_present_illness: "", return_visit: "", diagnosis: "", past_medical_history: "", laboratory_results: "", physical_examinations: ""}

        return medical_records
    end
    
    def check_return_visit_is_present(date, patient_id)
        @appointment = Appointment.where('consultation_date = ? AND patient_id = ?', DateTime.parse(date), patient_id)

        if !@appointment.nil?
            return @appointment
        else
            return nil
        end

    end

    def get_user
        @patients = Patient.get_patient_latest_complete_appointment
    end
     
    def appointment_params
        params.require(:appointment).permit(:appointment_id, :patient_id, :consultation_date, :appointment_type, :systolic, :diastolic, :weight, medical_records: [:menarche, :gravida, :para, :t, :p, :a, :l, :ob_history, :type, :lmp, :edc, :aog, :chief_complaint,              :history_of_present_illness, :return_visit, :record_date, :management, :recommendations, :diagnosis,                            :past_medical_history, :laboratory_results, :physical_examinations])
    end
    
end
