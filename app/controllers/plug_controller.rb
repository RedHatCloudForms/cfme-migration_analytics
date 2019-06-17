class PlugController < ApplicationController
  def show
    binding.pry
    render :text => 'hallo from a plugin'
  end
end
