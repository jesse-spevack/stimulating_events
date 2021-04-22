class DemoController < ApplicationController
  def dropdown
    @speakers = [
      'David Heinemeir Hannson',
      'Eileen M. Uchitelle',
      'Aaron Patterson',
      'Bryan Cantrill'
    ]
  end
end
