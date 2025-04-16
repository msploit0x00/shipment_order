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
    onload: function(frm) {
        let promises = [];

        frm.doc.items.forEach((Purchase_order) => {
            console.log('Purchase order', Purchase_order.name);
            // if (shipment_row.purchase_order) {
            //     // Asynchronously fetch the Purchase Order document
            //     let p = frappe.db.get_doc('Purchase Order', shipment_row.purchase_order).then((po_doc) => {
            //         let match_found = po_doc.items.some((po_item) => {
            //             return (
            //                 po_item.item_code === shipment_row.item_code &&
            //                 po_item.name === shipment_row.name
            //             );
            //         });

            //         if (!match_found) {
            //             frappe.msgprint({
            //                 title: __('Validation Error'),
            //                 message: __('Item {0} with row name {1} does not match the Purchase Order {2}', [
            //                     shipment_row.item_code,
            //                     shipment_row.name,
            //                     shipment_row.purchase_order
            //                 ]),
            //                 indicator: 'red'
            //             });
            //             frappe.validated = false;
            //         }
            //     });
            //     promises.push(p);
            // }
        });

        // Wait for all async calls before validating
        return Promise.all(promises);
    }
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
