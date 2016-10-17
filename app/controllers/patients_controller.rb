class PatientsController < ApplicationController
    
    include ApplicationHelper
    
    before_action :check_authorization, :get_hmo_list
    
    def index
        @patients = Patient.all
    end
    
    def new 
        @patient = Patient.new
        @patient.medical_record = medical_record_params
    end
    
    def create
               
        @patient = Patient.new(patient_params)
        @patient.age = get_age(patient_params[:birth_date])
        
        if @patient.save
            flash[:success] = "Patient successfully created."
            redirect_to patients_path
        end

    end
    
    def edit
        @patient = Patient.find(params[:id])

    end
    
    def update
        @patient = Patient.find(params[:id])
        
        if @patient.update(patient_params)
            flash[:success] = "Patient successfully updated."
            redirect_to edit_patient_path(id: params[:id])
        end
        
    end
    
    private

    def get_hmo_list
        @hmo = HealthMaintenanceOrganization.all
    end
    
    def get_age(birth_date)
        
        format_str = "%m/%d/" + (birth_date =~ /\d{4}/ ? "%Y" : "%y")
        date = Date.parse(birth_date) rescue Date.strptime(birth_date, format_str)
        
        now = Time.now.utc.to_date
        return now.year - date.year - (date.to_date.change(:year => now.year) > now ? 1 : 0)
        
    end
    
    def medical_record_params
        medical_record = { menarche: "", gravida: 0, para: 0, t: 0, p: 0, a: 0, l: 0, ob_history: ""}

        return medical_record
    end
    
    def patient_params
        params.require(:patient).permit(:hmo_id, :last_name, :first_name, :middle_name, :birth_date, :gender, :age, :civil_status, :address, :contact, :occupation, :blood_type, :height, :weight,
            medical_record: [:menarche, :gravida, :para, :t, :p, :a, :l, :ob_history])
    end
end
