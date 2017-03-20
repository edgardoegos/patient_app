class Patient < ActiveRecord::Base
    
    has_many :appointments
    has_many :patient_attachments

    attr_accessor :patient_attachments

    accepts_nested_attributes_for :appointments, allow_destroy: true
    accepts_nested_attributes_for :patient_attachments, allow_destroy: true
    
    enum gender: [:male, :female]
    enum civil_status: [:single ,:married, :widowed, :divorced, :separated]

    after_save :save_patient_attachments

    serialize :medical_record, JSON
    
    # validates :model_name, uniqueness: { scope: [:first_name, :last_name, :middle_name] }

    def save_patient_attachments
        if !self.patient_attachments.nil?
            self.patient_attachments.each_with_index do |patient_attachment, index|
                @patient_attachment = PatientAttachment.new
                @patient_attachment.patient_id = self.id
                @patient_attachment.attachment_type = PatientAttachment.types[patient_attachment[:type]]
                @patient_attachment.document = patient_attachment[:document]
                @patient_attachment.document_file_name = patient_attachment[:file_name]
                @patient_attachment.save
            end
        end
    end

    def self.get_patient_latest_complete_appointment

        subquery = "SELECT appointments.id from appointments where appointments.patient_id = patients.id AND appointment_type = 0 order by appointments.consultation_date desc limit 1"

        return self.select("patients.*, appointments.id as appointment_id")
                            .joins("LEFT OUTER JOIN appointments AS appointments ON appointments.patient_id = patients.id AND appointments.id = ( #{ subquery } )")
                            .where("appointments.status = 2")
                            .order( "appointments.consultation_date DESC")

    end

    def self.get_patient_latest_complete_appointment_by_patient_id(id)
        return self.select("patients.*, appointments.id as appointment_id, appointments.complaint")
                   .joins("LEFT OUTER JOIN appointments AS appointments ON appointments.patient_id = patients.id")
                   .where("patients.id = ? AND appointments.status = 2", id)
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