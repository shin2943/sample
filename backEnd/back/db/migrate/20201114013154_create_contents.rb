class CreateContents < ActiveRecord::Migration[5.2]
  def change
    create_table :contents do |t|
      t.string :text
      t.integer :x
      t.integer :y

      t.timestamps
    end
  end
end
