class DemoController < ApplicationController
  def dropdown
    @speakers = [
      'David Heinemeier Hannson',
      'Eileen M. Uchitelle',
      'Aaron Patterson',
      'Bryan Cantrill'
    ]
  end
end
