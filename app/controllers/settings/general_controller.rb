class Settings::GeneralController < ApplicationController
    
    include ApplicationHelper
    before_action :authenticate_user!
    before_action :check_authorization
    
    def index
        @setting = Setting.first
    end
    
    def update
    
        @setting = Setting.first
        
        if @setting.update(settings_params)
            flash[:success] = "Settings successfully updated."
            redirect_to settings_general_index_path
        else 
            flash[:error] = @setting.errors.full_messages.first
            redirect_to settings_general_index_path
        end
        
    end
    
    private
    
    def settings_params
        params.require(:setting).permit(:name, :logo, body: [:app_name, :app_tagline, :admin_email, :app_description])
    end
    
end
