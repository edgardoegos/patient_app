class CreatePatients < ActiveRecord::Migration
  def change
    create_table :patients do |t|
      t.string :first_name
      t.string :last_name
      t.string :middle_name
      t.datetime :birth_date
      t.integer :age
      t.integer :gender
      t.integer :civil_status
      t.string :occupation
      t.string :blood_type
      t.string :weight
      t.string :height
      t.string :address
      t.text :medical_record

      t.timestamps null: false
    end
  end
end
