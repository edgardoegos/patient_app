class Api::V1::PatientsController < ApplicationController
    
    respond_to :json
    def index
        respond_with Patient.all
    end
    
    def get_patient_by_name
        name = "#{params[:last_name].titlecase} #{params[:first_name].titlecase} #{params[:middle_name].titlecase}" 
        
        @patient = Patient.where("CONCAT_WS(' ', last_name, first_name, middle_name) LIKE :q", :q => "%#{name}%").first
        
        if !@patient.nil?
            respond_with @patient
        else 
            respond_with []
        end
    end
    
end