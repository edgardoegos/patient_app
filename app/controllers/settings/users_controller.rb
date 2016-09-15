class Settings::UsersController < ApplicationController
    
    before_action :get_all_users
    
    def index
#        render json: params
        
    end
    
    private
    
    def get_all_users
        @users = User.where.not(role: 0)
    end
    
end
