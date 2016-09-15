class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.datetime :consultation_date
      t.string :first_name
      t.string :last_name
      t.string :middle_name
      t.integer :systolic
      t.integer :diastolic
      t.string :weight
      t.text :complaint
      t.integer :status

      t.timestamps null: false
    end
  end
end
