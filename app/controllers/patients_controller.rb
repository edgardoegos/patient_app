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

        if check_patient_if_existing(new_patient_params[:last_name], new_patient_params[:first_name], new_patient_params[:middle_name]).blank?
            @patient = Patient.new(new_patient_params)
            if @patient.save
                if patient_params[:to_appointments].present?
                    flash[:success] = "Patient successfully created, Please schedule an appointment."
                    redirect_to new_appointment_path(last_name: @patient.last_name, first_name: @patient.first_name, middle_name: @patient.middle_name)
                else
                    flash[:success] = "Patient successfully created."
                    redirect_to patients_path
                end
            end
        else
            flash[:error] = "Patient is already registered."
            redirect_to new_patient_path
        end
    end
    
    def edit
        @patient = Patient.find(params[:id])
        @attachments = PatientAttachment.where('patient_id = ?', params[:id])
        if @patient.medical_record.nil?
            @patient.medical_record = medical_record_params
        end
        
    end
    
    def update
        @patient = Patient.find(params[:id])
        # @patient.age = get_age(patient_params[:birth_date])
        
        if @patient.update(update_patient_params)
            if patient_params[:to_appointments].present?
                flash[:success] = "Patient successfully updated, Please schedule an appointment."
                redirect_to new_appointment_path(last_name: @patient.last_name, first_name: @patient.first_name, middle_name: @patient.middle_name)
            else
                flash[:success] = "Patient successfully updated."
                redirect_to edit_patient_path(id: params[:id])
            end
        end
    end

    def show
        @patient = Patient.find(params[:id])
        @attachments = PatientAttachment.where('patient_id = ?', params[:id])
        @appointments = Appointment.where('patient_id = ?', params[:id]).order('consultation_date desc')
    end

    def appointment_details
        @appointment = Appointment.find(params[:id])

        if @appointment.appointment_type == "return_visit"
            @appointment_prev = Appointment.find(@appointment.parent_id)
        end
        # render json:@appointment
    end

    def attachment_delete
        @attachment = PatientAttachment.find(params[:id])
        @patient_id = @attachment.patient_id
        if @attachment.destroy
            flash[:success] = "User successfully deleted."
            redirect_to edit_patient_path(id: @patient_id)
        end
    end
    
    def destroy

        @patient = Patient.find(params[:id])

        if @patient.destroy
            @appointments = Appointment.where(patient_id: params[:id])
            
            if !@appointments.nil?
                @appointments.each do |appointment|
                    appointment.destroy
                end
            end
            
            flash[:success] = "Patient successfully deleted."
            redirect_to patients_path
        end
    end

    private

    def check_patient_if_existing(last_name, first_name, middle_name)
        name = "#{last_name.downcase.strip} #{first_name.downcase.strip} #{middle_name.downcase.strip}"

        @patient = Patient.where("CONCAT_WS(' ', lower(trim(last_name)), lower(trim(first_name)), lower(trim(middle_name))) LIKE :q", :q => "%#{name}%").first

        if !@patient.nil?
            return @patient
        else
            return []
        end

    end

    def get_hmo_list
        @hmo = HealthMaintenanceOrganization.all
    end

    def get_ob_score
        @ob_score = (1..20)
    end
    
    def get_age(birth_date)
        
        format_str = "%m/%d/" + (birth_date =~ /\d{4}/ ? "%Y" : "%y")
        date = Date.parse(birth_date) rescue Date.strptime(birth_date, format_str)
        
        now = Time.now.utc.to_date
        return now.year - date.year - (date.to_date.change(:year => now.year) > now ? 1 : 0)
        
    end
    
    def medical_record_params
        medical_record = { remarks: ""}

        return medical_record
    end
    
    def patient_params
        params.require(:patient).permit(:hmo_id, :last_name, :first_name, :middle_name, :birth_date, :gender, :age, :civil_status, :address, :contact, :occupation, :blood_type, :height, :weight, :to_appointments,
            medical_record: [:menarche, :gravida, :para, :t, :p, :a, :l, :ob_history, :type, :lmp, :edc, :aog, :chief_complaint, :history_of_present_illness, :return_visit, :record_date, :management, :recommendations, :diagnosis, :past_medical_history, :laboratory_results, :physical_examinations],
            patient_attachments: [:id, :document, :type, :file_name])
    end

    def new_patient_params
        params.require(:patient).permit(:hmo_id, :last_name, :first_name, :middle_name, :birth_date, :gender, :age, :civil_status, :address, :contact, :occupation, :blood_type, :height, :weight,
            medical_record: [:remarks])
    end

    def update_patient_params
        params.require(:patient).permit(:hmo_id, :last_name, :first_name, :middle_name, :birth_date, :gender, :age, :civil_status, :address, :contact, :occupation, :blood_type, :height, :weight,
            medical_record: [:remarks])
    end

end
