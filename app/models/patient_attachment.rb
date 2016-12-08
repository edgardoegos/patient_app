class PatientAttachment < ActiveRecord::Base

  belongs_to :patient

  enum type: [:past_medical_records, :laboratory_results, :physical_examinations]

  has_attached_file :document,
                    :url => "/system/:class/:attachment/:id/:style/:basename.:extension",
                    :path => ":rails_root/public/system/:class/:attachment/:id/:style/:basename.:extension"

  validates_attachment_content_type :document, :content_type =>['image/jpeg', 'image/png', 'image/gif', 'application/pdf']

  def self.directory
    "/system/patient_attachments/documents"
  end

end
