class Settings::HealthMaintenanceOrganizationsController < ApplicationController
  include ApplicationHelper
  before_action :authenticate_user!
  before_action :check_authorization, :get_hmo_list

  def index
    @hmo = HealthMaintenanceOrganization.new
  end

  def create

    @hmo = HealthMaintenanceOrganization.new(hmo_params)

    if @hmo.save
      flash[:success] = "Category successfully created."
      redirect_to settings_health_maintenance_organizations_path
    else
      flash[:error] = @hmo.errors.full_messages.first
      redirect_to settings_health_maintenance_organizations_path
    end

  end

  def edit
    @hmo = HealthMaintenanceOrganization.find(params[:id])
  end

  def update
    @hmo = HealthMaintenanceOrganization.find(params[:id])

    if @hmo.update(hmo_params)
      flash[:success] = "Category successfully created."
      redirect_to edit_settings_health_maintenance_organization_path(@hmo.id)
    else
      flash[:success] = "Category successfully created."
      redirect_to edit_settings_health_maintenance_organization_path(@hmo.id)
    end
  end

  def destroy
    @hmo = HealthMaintenanceOrganization.find(params[:id])

    if @hmo.destroy
      flash[:success] = "Category successfully deleted."
      redirect_to settings_health_maintenance_organizations_path
    end
  end

  private

  def get_hmo_list
    @hmo_list = HealthMaintenanceOrganization.all
  end

  def hmo_params
    params.require(:hmo).permit(:name, :description)
  end

end
