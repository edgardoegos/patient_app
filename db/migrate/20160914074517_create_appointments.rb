class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.datetime :consultation_date
      t.integer :systolic
      t.integer :diastolic
      t.string :weight
      t.text :complaint
      t.text :remarks
      t.integer :status

      t.timestamps null: false
    end
  end
end
