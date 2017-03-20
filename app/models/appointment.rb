class Appointment < ActiveRecord::Base

    belongs_to :patient

    enum status: [:queued, :inprogress, :complete, :overdue, :cancel]
    enum appointment_type: [:appointment, :return_visit]
    enum medical_record_type: [:ob, :gyne]


    serialize :medical_records, JSON

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
            @patient.age = patient_appointment_params[:age]
            @patient.civil_status = patient_appointment_params[:civil_status]
            @patient.address = patient_appointment_params[:address]
            @patient.contact  = patient_appointment_params[:contact]
            @patient.occupation = patient_appointment_params[:occupation]
            @patient.blood_type  = patient_appointment_params[:blood_type]
            @patient.height  = patient_appointment_params[:height]
            @patient.weight = patient_appointment_params[:weight]
            # @patient.medical_record = patient_appointment_params[:medical_record]
            # @patient.patient_attachments = patient_appointment_params[:patient_attachments]
            @patient.save
            
            @appointment.patient_id = @patient.id
            
        end
        
        if @appointment.save

            if patient_appointment_params[:appointments][:medical_records][:return_visit] != ""
                create_return_visit(patient_appointment_params[:appointments][:medical_records][:return_visit], @appointment.patient_id, @appointment.id)
            end

            return @appointment
        else
            return nil
        end
        
    end

    def self.create_return_visit(return_visit_date, patient_id, parent_id)

        medical_records = { menarche: "", gravida: 0, para: 0, t: 0, p: 0, a: 0, l: 0, ob_history: "", type: "ob", lmp: "", edc: "", aog: "", chief_complaint: "", history_of_present_illness: "", return_visit: "", diagnosis: "", past_medical_history: "", laboratory_results: "", physical_examinations: ""}

        @appointment = Appointment.new()

        @appointment.appointment_type = "return_visit"
        @appointment.consultation_date = return_visit_date
        @appointment.patient_id = patient_id
        @appointment.parent_id = parent_id
        @appointment.record_date = return_visit_date
        @appointment.medical_records = medical_records

        @appointment.save()

    end

    def self.save_follow_up_appointment(patient_appointment_params, type)

        medical_records = { menarche: "", gravida: 0, para: 0, t: 0, p: 0, a: 0, l: 0, ob_history: "", type: "ob", lmp: "", edc: "", aog: "", chief_complaint: "", history_of_present_illness: "", return_visit: "", diagnosis: "", past_medical_history: "", laboratory_results: "", physical_examinations: ""}

        @appointment = self.new(patient_appointment_params[:appointments])
        @appointment.appointment_type = type
        @appointment.parent_id = patient_appointment_params["appointment_id"]
        @appointment.patient_id = patient_appointment_params["patient_id"]
        @appointment.consultation_date = patient_appointment_params["consultation_date"]
        @appointment.record_date = patient_appointment_params["consultation_date"]
        @appointment.medical_records = medical_records

        if @appointment.save
            return @appointment
        else
            return nil
        end

    end
    
    def self.save_follow_up_appointment_main(patient_appointment_params, type)

        @appointment = self.new(patient_appointment_params[:appointments])
        @appointment.appointment_type = type
        @appointment.parent_id = patient_appointment_params["appointment_id"]
        @appointment.patient_id = patient_appointment_params["patient_id"]
        @appointment.consultation_date = patient_appointment_params["consultation_date"]
        @appointment.record_date = patient_appointment_params["consultation_date"]
        @appointment.medical_records = patient_appointment_params["medical_records"]
        @appointment.systolic = patient_appointment_params["systolic"]
        @appointment.diastolic = patient_appointment_params["diastolic"]
        @appointment.weight = patient_appointment_params["weight"]

        if @appointment.save
            return @appointment
        else
            return nil
        end

    end

    def self.save_follow_up_appointment_from_return_visit_date()


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

    def self.get_appointments(filter)
        if filter == "today"
            return self.where('consultation_date = ?', Date.today)
        else
            return self.where('consultation_date = ?', Date.yesterday)
        end
    end

    def self.get_filtered_appointments(filter)
        if filter[:record_date].present?
            if filter[:status] == "All" && filter[:type] == "All"
                return self.where('consultation_date = ?', DateTime.parse(filter[:record_date]))
            elsif filter[:status] != "All" && filter[:type] == "All"
                return self.where('consultation_date = ? AND status = ?', DateTime.parse(filter[:record_date]), Appointment.statuses[filter[:status]])
            elsif filter[:status] == "All" && filter[:type] != "All"
                return self.where('consultation_date = ? AND appointment_type = ?', DateTime.parse(filter[:record_date]), Appointment.appointment_types[filter[:type]])
            else
                return self.where('consultation_date = ? AND appointment_type = ? AND status = ?', DateTime.parse(filter[:record_date]), Appointment.appointment_types[filter[:type]], Appointment.statuses[filter[:status]])
            end
        else
            if filter[:status] == "All" && filter[:type] == "All"
                return self.where(:consultation_date => DateTime.parse(filter[:start])..DateTime.parse(filter[:end]))
            elsif filter[:status] != "All" && filter[:type] == "All"
                return self.where(:consultation_date => DateTime.parse(filter[:start])..DateTime.parse(filter[:end]), :status => Appointment.statuses[filter[:status]])
            elsif filter[:status] == "All" && filter[:type] != "All"
                return self.where(:consultation_date => DateTime.parse(filter[:start])..DateTime.parse(filter[:end]), :appointment_type => Appointment.appointment_types[filter[:type]])
            else
                return self.where(:consultation_date => DateTime.parse(filter[:start])..DateTime.parse(filter[:end]), :appointment_type => Appointment.appointment_types[filter[:type]], :status => Appointment.statuses[filter[:status]])
            end
        end
    end

end
