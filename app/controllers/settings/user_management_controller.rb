class Settings::UserManagementController < ApplicationController

    include ApplicationHelper
    
    before_action :authenticate_user!
    before_action :check_authorization
    
    before_action :get_all_users
    before_action :get_all_countries
    
    def index
#        render json: params
    end
    
    def new
        @user = User.new
    end

    def create

      @user = User.new(user_params)

      if @user.save
          flash[:success] = "User successfully created."
          redirect_to settings_user_management_index_path
      else
          render 'new'
      end 

    end

    def edit
      @user = User.find(params[:id])
    end
    
    def update

      @user = User.find(params[:id])
        
      if @user.update(user_params)
          flash[:success] = "User successfully updated."
          redirect_to edit_settings_user_management_path(@user.id)
      else 
          flash[:error] =  @user.errors.full_messages.first
          redirect_to edit_settings_user_management_path(@user.id)
      end
    end

    def destroy

        @user = User.find(params[:id])

        if @user.destroy
            flash[:success] = "User successfully deleted."
            redirect_to settings_user_management_index_path
        end
    end
    
    private
    
    def get_all_users
        @users = User.where.not(role: 0)
    end
    
    def get_all_countries
        @countries = CS.get
    end
    
    def user_params
        if !params[:user][:password].blank?
            params.require(:user).permit(:email, :username, :first_name, :last_name, :role, :gender, :birth_date, :address, :country, :postal_code, :phone_number, :status, :password, :password_confirmation, :avatar, :password, :password_confirmation)
        else 
            params.require(:user).permit(:email, :username, :first_name, :last_name, :role, :gender, :birth_date, :address, :country, :postal_code, :phone_number, :status, :avatar)
        end
    end
    
end
