class CreateBiEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :bi_events do |t|
      t.string :oid, index: true, null: false
      t.string :event_type, index: true, null: false
      t.datetime :occurred_at, index: true
      t.jsonb :metadata, default: {}

      t.timestamps
    end

    add_index :bi_events, %i[event_type oid], unique: true
  end
end
