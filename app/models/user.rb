class User < ActiveRecord::Base
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable and :omniauthable
    
    
    devise :database_authenticatable, :recoverable, :rememberable, :trackable, :validatable
    
    enum status: {active: 1, inactive: 0}
    enum gender: [:male, :female]
    enum role: [:super_admin, :administrator, :assistant, :staff]
    
    validates :first_name, :last_name, :username, :email, :role, :gender, :birth_date, :address, :country, :postal_code, :phone_number, presence: true
    
    validates_uniqueness_of :email, :case_sensitive => false
	validates_uniqueness_of :username, :case_sensitive => false
    
    validates_confirmation_of :password
    
end