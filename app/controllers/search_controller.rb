class SearchController < ApplicationController
  before_action :authenticate_user!

  def index
        # @query_strings = search_params[:query_strings]
        @patient_results = Patient.search_query(search_params[:query_strings], params['page'])
    # render json: @patient_results
  end

  private

  def search_params
    params.require(:search).permit(:query_strings, )
  end

end
