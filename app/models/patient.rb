class Patient < ActiveRecord::Base
    
    has_many :appointments
    
    accepts_nested_attributes_for :appointments, allow_destroy: true
    
    enum gender: [:male, :female]
    enum civil_status: [:single ,:married, :widowed, :divorced, :separated]
    
    serialize :medical_record, JSON
    
end