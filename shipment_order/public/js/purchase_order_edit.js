frappe.ui.form.on('Purchase Order', {
    refresh: function(frm) {
        if (frm.doc.docstatus === 1) {  
            frm.add_custom_button(__('Shipment Order'), function() {
                frappe.call({
                    method: "shipment_order.purchase_order_edit.create_shipment_order",  
                    args: {
                        docname: frm.doc.name
                    },
                    callback: function(response) {
                        frappe.set_route('Form', 'Shipments Orders', response.message);
                    }
                });
            },__('Create'));
        }
    },
});


// frappe.ui.form.on('Purchase Order', {
//     refresh: function(frm) {
//         if (!frm.is_new()) {  
//             frm.add_custom_button(__('Run Python Method'), function() {
//                 frappe.call({
//                     method: "shipment_order.shipment_order.purchase_order_edit.your_custom_function",  
//                     args: {
//                         docname: frm.doc.name
//                     },
//                     callback: function(response) {
//                         frappe.msgprint(response.message);
//                     }
//                 });
//             },);
//         }
//     }
// });
