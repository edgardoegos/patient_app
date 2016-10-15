class Patient < ActiveRecord::Base
    
    has_many :appointments
    
    accepts_nested_attributes_for :appointments, allow_destroy: true
    
    enum gender: [:male, :female]
    enum civil_status: [:single ,:married, :widowed, :divorced, :separated]
    
    serialize :medical_record, JSON

    def self.get_patient_latest_complete_appointment



        return self.select("patients.*, appointments.id as appointment_id")
                            .joins("LEFT OUTER JOIN appointments AS appointments ON appointments.patient_id = patients.id AND appointments.id = ( #{ subquery } )")
                            .where("appointments.status = 2")
                            .order( "appointments.consultation_date DESC")

    end

    def self.get_patient_latest_complete_appointment_by_patient_id(id)
        return self.select("patients.*, appointments.id as appointment_id, appointments.complaint")
                   .joins("LEFT OUTER JOIN appointments AS appointments ON appointments.patient_id = patients.id")
                   .where("patients.id = ? AND appointments.consultation_date = ?  AND appointments.status = 2", id, Date.today)
                   .first
    end

    def self.search_query(query_strings, page)

        subquery = "SELECT appointments.id from appointments where appointments.patient_id = patients.id order by appointments.consultation_date desc limit 1"

        return self.select("patients.*, appointments.id as appointment_id")
                     .joins("LEFT OUTER JOIN appointments AS appointments ON appointments.patient_id = patients.id AND appointments.id = ( #{ subquery } )")
                    .where("patients.first_name LIKE ? OR patients.last_name LIKE ? OR patients.middle_name LIKE ? OR patients.medical_record LIKE ?", "%#{query_strings}%", "%#{query_strings}%", "%#{query_strings}%", "%#{query_strings}%")
                   .order( "appointments.consultation_date DESC")
                   .paginate(per_page: 10, page: page)
    end
    
end