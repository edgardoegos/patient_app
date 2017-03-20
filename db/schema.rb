# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170314145056) do

  create_table "appointments", force: :cascade do |t|
    t.datetime "consultation_date"
    t.integer  "systolic",          limit: 4
    t.integer  "diastolic",         limit: 4
    t.string   "weight",            limit: 255
    t.text     "complaint",         limit: 65535
    t.text     "remarks",           limit: 65535
    t.integer  "status",            limit: 4
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.integer  "patient_id",        limit: 4
    t.integer  "parent_id",         limit: 4
    t.integer  "appointment_type",  limit: 4
    t.text     "medical_records",   limit: 65535
    t.datetime "record_date"
    t.text     "management",        limit: 65535
    t.text     "recommendations",   limit: 65535
    t.text     "summary",           limit: 65535
  end

  create_table "health_maintenance_organizations", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "description", limit: 255
    t.integer  "status",      limit: 4
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "patient_attachments", force: :cascade do |t|
    t.string   "document_file_name",    limit: 255
    t.string   "document_content_type", limit: 255
    t.integer  "document_file_size",    limit: 4
    t.datetime "document_updated_at"
    t.integer  "patient_id",            limit: 4
    t.integer  "attachment_type",       limit: 4
    t.integer  "tag",                   limit: 4
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
  end

  create_table "patients", force: :cascade do |t|
    t.string   "first_name",     limit: 255
    t.string   "last_name",      limit: 255
    t.string   "middle_name",    limit: 255
    t.datetime "birth_date"
    t.integer  "age",            limit: 4
    t.integer  "gender",         limit: 4
    t.integer  "civil_status",   limit: 4
    t.string   "occupation",     limit: 255
    t.string   "blood_type",     limit: 255
    t.string   "weight",         limit: 255
    t.string   "height",         limit: 255
    t.string   "address",        limit: 255
    t.text     "medical_record", limit: 65535
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.string   "contact",        limit: 255
    t.integer  "hmo_id",         limit: 4
  end

  create_table "settings", force: :cascade do |t|
    t.string   "name",              limit: 255
    t.string   "logo_file_name",    limit: 255
    t.string   "logo_content_type", limit: 255
    t.integer  "logo_file_size",    limit: 4
    t.datetime "logo_updated_at"
    t.text     "body",              limit: 65535
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.string   "username",               limit: 255
    t.string   "first_name",             limit: 255
    t.string   "last_name",              limit: 255
    t.integer  "role",                   limit: 4
    t.integer  "status",                 limit: 4
    t.integer  "gender",                 limit: 4,   default: 0,  null: false
    t.datetime "birth_date"
    t.string   "address",                limit: 255
    t.string   "country",                limit: 255
    t.string   "postal_code",            limit: 255
    t.string   "phone_number",           limit: 255
    t.string   "avatar_file_name",       limit: 255
    t.string   "avatar_content_type",    limit: 255
    t.integer  "avatar_file_size",       limit: 4
    t.datetime "avatar_updated_at"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
