class AddHmoIdToPatients < ActiveRecord::Migration
  def change
    add_column :patients, :hmo_id, :integer
  end
end
