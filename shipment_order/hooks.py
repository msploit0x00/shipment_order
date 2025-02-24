app_name = "shipment_order"
app_title = "shipment_order"
app_publisher = "shipment_order"
app_description = "shipment_order"
app_email = "shipment_order@gmail.ocm"
app_license = "mit"

# Apps
# ------------------

# required_apps = []

# Each item in the list will be shown as an app in the apps page
# add_to_apps_screen = [
# 	{
# 		"name": "shipment_order",
# 		"logo": "/assets/shipment_order/logo.png",
# 		"title": "shipment_order",
# 		"route": "/shipment_order",
# 		"has_permission": "shipment_order.api.permission.has_app_permission"
# 	}
# ]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/shipment_order/css/shipment_order.css"
# app_include_js = "/assets/shipment_order/js/shipment_order.js"

# include js, css files in header of web template
# web_include_css = "/assets/shipment_order/css/shipment_order.css"
# web_include_js = "/assets/shipment_order/js/shipment_order.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "shipment_order/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
doctype_js = {
    "Purchase Order": "public/js/purchase_order_edit.js",
    "Material Request": "public/js/material_request_edit.js"
}
# doctype_js = {"Material Request" : "public/js/material_request_edit.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "shipment_order/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "shipment_order.utils.jinja_methods",
# 	"filters": "shipment_order.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "shipment_order.install.before_install"
# after_install = "shipment_order.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "shipment_order.uninstall.before_uninstall"
# after_uninstall = "shipment_order.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "shipment_order.utils.before_app_install"
# after_app_install = "shipment_order.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "shipment_order.utils.before_app_uninstall"
# after_app_uninstall = "shipment_order.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "shipment_order.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

override_doctype_class = {
	"Purchase Order": "shipment_order.purchase_order_edit.CustomPurchaseOrder",
    "Material Request" : "shipment_order.material_request_edit.CustomMaterialRequest"
}

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"shipment_order.tasks.all"
# 	],
# 	"daily": [
# 		"shipment_order.tasks.daily"
# 	],
# 	"hourly": [
# 		"shipment_order.tasks.hourly"
# 	],
# 	"weekly": [
# 		"shipment_order.tasks.weekly"
# 	],
# 	"monthly": [
# 		"shipment_order.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "shipment_order.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "shipment_order.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "shipment_order.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["shipment_order.utils.before_request"]
# after_request = ["shipment_order.utils.after_request"]

# Job Events
# ----------
# before_job = ["shipment_order.utils.before_job"]
# after_job = ["shipment_order.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"shipment_order.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

