# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_10_06_104136) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "articles", force: :cascade do |t|
    t.string "title"
    t.string "slug"
    t.text "body"
    t.datetime "publish_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "author_name", default: "Josh Pigford"
    t.string "author_twitter", default: "Shpigford"
    t.string "hero_image"
    t.string "podcast"
  end

  create_table "bi_events", force: :cascade do |t|
    t.string "oid", null: false
    t.string "event_type", null: false
    t.datetime "occurred_at"
    t.jsonb "metadata", default: {}
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.decimal "value", precision: 16, scale: 6
    t.index ["event_type", "oid"], name: "index_bi_events_on_event_type_and_oid", unique: true
    t.index ["event_type"], name: "index_bi_events_on_event_type"
    t.index ["occurred_at"], name: "index_bi_events_on_occurred_at"
    t.index ["oid"], name: "index_bi_events_on_oid"
  end

  create_table "early_access_users", force: :cascade do |t|
    t.string "email"
    t.string "country"
    t.string "age"
    t.text "interests", default: [], array: true
    t.text "comments"
    t.integer "referrer_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "device"
    t.text "current"
    t.string "full_name"
  end

  create_table "episodes", force: :cascade do |t|
    t.string "external_id", null: false
    t.integer "number", null: false
    t.string "title", null: false
    t.text "summary", default: "", null: false
    t.text "description", default: "", null: false
    t.string "image_url", null: false
    t.string "formatted_published_at", null: false
    t.string "formatted_duration", null: false
    t.text "embed_html_player", null: false
    t.datetime "external_updated_at", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "slug", null: false
    t.index ["external_id"], name: "index_episodes_on_external_id", unique: true
    t.index ["number"], name: "index_episodes_on_number", unique: true
    t.index ["slug"], name: "index_episodes_on_slug", unique: true
  end

  create_table "equity_prices", force: :cascade do |t|
    t.string "symbol", null: false
    t.date "date", null: false
    t.decimal "open", precision: 20, scale: 11
    t.decimal "high", precision: 20, scale: 11
    t.decimal "low", precision: 20, scale: 11
    t.decimal "close", precision: 20, scale: 11
    t.string "source"
    t.string "currency", default: "usd"
    t.string "exchange"
    t.string "kind"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["date"], name: "index_equity_prices_on_date"
    t.index ["symbol", "date"], name: "index_equity_prices_on_symbol_and_date", unique: true
    t.index ["symbol"], name: "index_equity_prices_on_symbol"
  end

  create_table "market_caps", force: :cascade do |t|
    t.string "symbol", null: false
    t.bigint "value", null: false
    t.datetime "created_at", precision: 6, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", precision: 6, default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["symbol"], name: "index_market_caps_on_symbol", unique: true
  end

  create_table "roadmap_ideas", force: :cascade do |t|
    t.string "email", null: false
    t.string "category", null: false
    t.text "description", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "term_suggestions", force: :cascade do |t|
    t.string "email", null: false
    t.string "term", null: false
    t.string "definition"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "tools", force: :cascade do |t|
    t.string "name", null: false
    t.text "description", null: false
    t.string "topic"
    t.string "sub_topic"
    t.string "status", null: false
    t.string "email", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "votes_count"
  end

  create_table "votes", force: :cascade do |t|
    t.bigint "tool_id", null: false
    t.string "ip_address", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["tool_id", "ip_address"], name: "index_votes_on_tool_id_and_ip_address", unique: true
    t.index ["tool_id"], name: "index_votes_on_tool_id"
  end

  create_table "waitlists", force: :cascade do |t|
    t.string "email", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_waitlists_on_email", unique: true
  end

  add_foreign_key "votes", "tools"
end
