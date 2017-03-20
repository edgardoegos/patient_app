class Api::V1::PatientsController < ApplicationController
    
    respond_to :json
    def index
        respond_with Patient.all
    end
    
    def get_patient_by_name
        name = "#{params[:last_name].downcase.strip} #{params[:first_name].downcase.strip} #{params[:middle_name].downcase.strip}"
        
        @patient = Patient.where("CONCAT_WS(' ', lower(trim(last_name)), lower(trim(first_name)), lower(trim(middle_name))) LIKE :q", :q => "%#{name}%").first

        if !@patient.nil?
            respond_with @patient
        else
            respond_with []
        end

    end

    def get_patient_by_name_and_consultation_date

        name = "#{params[:last_name].downcase.strip} #{params[:first_name].downcase.strip} #{params[:middle_name].downcase.strip}"
        consultation_date = params[:consultation_date]

        @patient = Patient.where("CONCAT_WS(' ', lower(trim(last_name)), lower(trim(first_name)), lower(trim(middle_name))) LIKE :q", :q => "%#{name}%").first
        @appointment = Appointment.where(patient_id: @patient.id, consultation_date: DateTime.parse(consultation_date))

        if !@appointment.blank?
            respond_with true
        else
            respond_with false
        end

    end

end