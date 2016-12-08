class CreatePatientAttachments < ActiveRecord::Migration
  def change
    create_table :patient_attachments do |t|
      t.attachment :document
      t.integer :patient_id
      t.integer :attachment_type
      t.integer :tag

      t.timestamps null: false
    end
  end
end
