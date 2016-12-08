class Api::V1::PatientsController < ApplicationController
    
    respond_to :json
    def index
        respond_with Patient.all
    end
    
    def get_patient_by_name
        name = "#{params[:last_name].downcase.strip} #{params[:first_name].downcase.strip} #{params[:middle_name].downcase.strip}"
        
        @patient = Patient.where("CONCAT_WS(' ', lower(trim(last_name)), lower(trim(first_name)), lower(trim(middle_name))) LIKE :q", :q => "%#{name}%").first

        # respond_with @patient

        if !@patient.nil?
            respond_with @patient
        else
            respond_with []
        end

    end
    
end