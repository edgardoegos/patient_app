class Appointment < ActiveRecord::Base
    
    belongs_to :patient
    
    enum status: [:queued, :inprogress, :done, :overdue]
    
    def self.save_appointment(patient_appointment_params)
        
        @appointment = self.new(patient_appointment_params[:appointments])
        @appointment.status = 0
        
        
        if Integer(patient_appointment_params[:appointments][:patient_id]) == 0
        
            @patient = Patient.new

            @patient.last_name       = patient_appointment_params[:last_name]    
            @patient.first_name      = patient_appointment_params[:first_name]    
            @patient.middle_name     = patient_appointment_params[:middle_name]  
            @patient.birth_date      = patient_appointment_params[:birth_date] 
            @patient.gender          = patient_appointment_params[:gender]  
            @patient.age             = get_age(patient_appointment_params[:birth_date])   
            @patient.civil_status    = patient_appointment_params[:civil_status]  
            @patient.address         = patient_appointment_params[:address]       
            @patient.contact         = patient_appointment_params[:contact]       
            @patient.occupation      = patient_appointment_params[:occupation]    
            @patient.blood_type      = patient_appointment_params[:blood_type]   
            @patient.height          = patient_appointment_params[:height]        
            @patient.weight          = patient_appointment_params[:weight]      
            @patient.weight          = patient_appointment_params[:weight]      
            @patient.medical_record  = patient_appointment_params[:medical_record]

            @patient.save
            
            @appointment.patient_id = @patient.id
            
        end
        
        if @appointment.save
            return @appointment
        else
            retunr nil
        end
        
    end
    
    def self.get_age(birth_date)
        
        format_str = "%m/%d/" + (birth_date =~ /\d{4}/ ? "%Y" : "%y")
        date = Date.parse(birth_date) rescue Date.strptime(birth_date, format_str)
        
        now = Time.now.utc.to_date
        return now.year - date.year - (date.to_date.change(:year => now.year) > now ? 1 : 0)
        
    end
    
    def self.get_todays_appointments
         return self.where('consultation_date = ? AND status <> ? AND status <> ?', Date.today, 2, 3)
    end
    
    def self.get_patient_by_time_period(params)
        
        if params[:date].present?
            if params[:date] == "today"
                return self.where('consultation_date = ? AND status <> ? AND status <> ?', Date.today, 0, 1)
            else 
                return self.where('consultation_date = ? AND status <> ? AND status <> ?', Date.yesterday, 0, 1)
            end
        end
        
        if params[:month].present?
            return self.where('extract(month from consultation_date) = ? AND extract(year from consultation_date) = ? AND status <> ? AND status <> ?', Date::MONTHNAMES.index(params[:month].titlecase), Time.now.year, 0, 1)
        end
    end
    
end
