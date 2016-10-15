class FollowUpsController < ApplicationController
    
    before_action :get_user
    
    def index
        @follow_ups = Appointment.all  #get_todays_appointments

    end
    
    def new 
        @appointment = Appointment.new
    end
    
    def create

        # render json: Patient.get_patient_latest_complete_appointment_by_patient_id(appointment_params[:patient_id])

        appointment_type = "follow_up";

        if !Appointment.save_follow_up_appointment(appointment_params, appointment_type).nil?
            flash[:success] = "Appointment successfully created"
            redirect_to appointments_path
        end
    
    end
    
    private
    
    def get_user
        @patients = Patient.get_patient_latest_complete_appointment
    end
     
    def appointment_params
        params.require(:appointment).permit(:appointment_id, :patient_id, :consultation_date, :appointment_type)
    end
    
end
