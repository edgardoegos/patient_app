class Devise::RegistrationsController < DeviseController
  prepend_before_action :authenticate_scope!, only: [:new, :create, :edit, :update, :destroy]
  prepend_before_action :set_minimum_password_length, only: [:new, :edit]
    
  # GET /resource/sign_up
  def new
#      render json: current_user.present?
    @user = User.new
  end

  # POST /resource
  def create
    
      @user = User.new(sign_up_params)

      if @user.save
          redirect_to settings_users_path(success: 1)
      else
          render 'new'
      end 
      
  end

  # GET /resource/edit
  def edit
      @user = User.find(params[:id])
  end

  # PUT /resource
  # We need to use a copy of the resource because we don't want to change
  # the current user in place.
  def update
      
#      render json: account_update_params
      @user = User.find(account_update_params[:id])
      
#      render json: params
      if @user.update(account_update_params)
          redirect_to edit_user_registration_path(@user.id, success: true)
      end
  end

  # DELETE /resource
  def destroy
    
    @user = User.find(params[:id])

    if @user.destroy
        redirect_to settings_users_path(:success => 3)
    end
  end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
    def admin_change_password
        
    end
    
    
  def cancel
    expire_data_after_sign_in!
    redirect_to new_registration_path(resource_name)
  end

  protected

  def update_needs_confirmation?(resource, previous)
    resource.respond_to?(:pending_reconfirmation?) &&
      resource.pending_reconfirmation? &&
      previous != resource.unconfirmed_email
  end

  # By default we want to require a password checks on update.
  # You can overwrite this method in your own RegistrationsController.
  def update_resource(resource, params)
    resource.update_with_password(params)
  end

  # Build a devise resource passing in the session. Useful to move
  # temporary session data to the newly created user.
  def build_resource(hash=nil)
    self.resource = resource_class.new_with_session(hash || {}, session)
  end

  # Signs in a user on sign up. You can overwrite this method in your own
  # RegistrationsController.
  def sign_up(resource_name, resource)
    sign_in(resource_name, resource)
  end

  # The path used after sign up. You need to overwrite this method
  # in your own RegistrationsController.
  def after_sign_up_path_for(resource)
    after_sign_in_path_for(resource)
  end

  # The path used after sign up for inactive accounts. You need to overwrite
  # this method in your own RegistrationsController.
  def after_inactive_sign_up_path_for(resource)
    scope = Devise::Mapping.find_scope!(resource)
    router_name = Devise.mappings[scope].router_name
    context = router_name ? send(router_name) : self
    context.respond_to?(:root_path) ? context.root_path : "/"
  end

  # The default url to be used after updating a resource. You need to overwrite
  # this method in your own RegistrationsController.
  def after_update_path_for(resource)
    signed_in_root_path(resource)
  end

  # Authenticates the current scope and gets the current resource from the session.
  def authenticate_scope!
    send(:"authenticate_#{resource_name}!", force: true)
    self.resource = send(:"current_#{resource_name}")
  end

#  def sign_up_params
#    devise_parameter_sanitizer.sanitize(:sign_up)
#  end

#  def account_update_params
#    devise_parameter_sanitizer.sanitize(:account_update)
#  end

  def translation_scope
    'devise.registrations'
  end
    
    private

  def sign_up_params
      
  end
    
    private

  def sign_up_params
    params.require(:user).permit(:first_name, :last_name, :email, :username, :role, :status, :password, :password_confirmation)
  end

  def account_update_params
      if params[:user][:role].present?
          if params[:user][:password].present?
              params.require(:user).permit(:id, :email, :username, :role, :status, :password, :password_confirmation)
          else
              params.require(:user).permit(:id, :email, :username, :role, :status)
          end
      else
          params.require(:user).permit(:id, :first_name, :last_name)
      end
  end
end