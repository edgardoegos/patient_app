class AppointmentsController < ApplicationController
    
    def index
        @appointments = Appointment.get_todays_appointments
    end
    
    def new 
        @appointment = Appointment.new
    end
    
    def create
        
        if !Appointment.save_appointment(appointment_params).nil?
            redirect_to appointments_path(success: 1)
        end
    
    end
    
    def update
       @appointment = Appointment.find(params[:id])
        
        if @appointment.update(update_appointment_params)
            redirect_to appointments_path(success: 2)
        end
    end
    
    def history
        if params[:date].present? || params[:month].present?
            @appointments = Appointment.get_patient_by_time_period(params)
        else
            @appointments = Appointment.where('status <> ?', 0).order(:created_at)
        end
    end
    
    private
    
    def appointment_params
        params.require(:patient).permit(:last_name, :first_name, :middle_name, :birth_date, :gender, :age, :civil_status, :address, :contact, :occupation, :blood_type, :height, :weight,
            appointments: [:patient_id, :consultation_date, :first_name, :last_name, :middle_name, :systolic, :diastolic, :weight, :complaint, :status],
            medical_record: [:menarche, :gravida, :para, :t, :p, :a, :l, :ob_history])
    end
    
    def update_appointment_params
        params.require(:appointment).permit(:patient_id, :consultation_date, :first_name, :last_name, :middle_name, :systolic, :diastolic, :weight, :complaint, :status)

    end
    
end