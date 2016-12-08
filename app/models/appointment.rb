class Appointment < ActiveRecord::Base

    belongs_to :patient

    enum status: [:queued, :inprogress, :complete, :cancel]
    enum appointment_type: [:appointment, :follow_up]

    before_create :save_default

    def save_default
        # self.appointment_type = 0
        self.status = 0
    end

    def self.save_appointment(patient_appointment_params, type)
        
        @appointment = self.new(patient_appointment_params[:appointments])
        @appointment.appointment_type = type


        if Integer(patient_appointment_params[:appointments][:patient_id]) == 0
        
            @patient = Patient.new

            @patient.hmo_id =  patient_appointment_params[:hmo_id]
            @patient.last_name = patient_appointment_params[:last_name]
            @patient.first_name = patient_appointment_params[:first_name]
            @patient.middle_name = patient_appointment_params[:middle_name]
            @patient.birth_date = patient_appointment_params[:birth_date]
            @patient.gender  = patient_appointment_params[:gender]
            @patient.age = get_age(patient_appointment_params[:birth_date])
            @patient.civil_status = patient_appointment_params[:civil_status]
            @patient.address = patient_appointment_params[:address]
            @patient.contact  = patient_appointment_params[:contact]
            @patient.occupation = patient_appointment_params[:occupation]
            @patient.blood_type  = patient_appointment_params[:blood_type]
            @patient.height  = patient_appointment_params[:height]
            @patient.weight = patient_appointment_params[:weight]
            @patient.weight = patient_appointment_params[:weight]
            @patient.medical_record = patient_appointment_params[:medical_record]
            @patient.patient_attachments = patient_appointment_params[:patient_attachments]
            @patient.save
            
            @appointment.patient_id = @patient.id
            
        end
        
        if @appointment.save
            return @appointment
        else
            return nil
        end
        
    end

    def self.save_follow_up_appointment(patient_appointment_params, type)
        @appointment = self.new(patient_appointment_params[:appointments])
        @appointment.appointment_type = type
        @appointment.parent_id = Patient.get_patient_latest_complete_appointment_by_patient_id(patient_appointment_params["patient_id"]).appointment_id
        @appointment.patient_id = patient_appointment_params["patient_id"]
        @appointment.consultation_date = patient_appointment_params["consultation_date"]
        @appointment.complaint = Patient.get_patient_latest_complete_appointment_by_patient_id(patient_appointment_params["patient_id"]).complaint

        if @appointment.save
            return @appointment
        else
            return nil
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

    def self.get_all_overdue_appointment
        return self.where('consultation_date < ? AND status <> ? AND status <> ?', Date.today, 2, 3)
    end

    def self.get_current_appointment
        @appointment = self.where('consultation_date = ? AND status <> 2', Date.today).order(created_at: :asc)

        @appointment_complete = self.where('consultation_date = ? AND status = 2', Date.today).order(created_at: :asc)

        return @appointment + @appointment_complete
    end

    def self.get_future_appointment
        return self.where('consultation_date > ? AND status = 0', Date.today)
    end

end
