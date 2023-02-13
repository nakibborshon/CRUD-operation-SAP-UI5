sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.bjit.project5.borshonproject5.controller.View1", {
            onInit: function () {
                this.onReadAll();
                //                this.onReadFilters();
                //                this.oReadSorter();
                //                this.oReadParameter();
                //                this.onReadKey();
            },
            onReadAll: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/Products", {
                    success: function (odata) {
                        console.log(odata);
                        var jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);
                    }, error: function (oError) {
                        console.log(oError);
                    }
                });
            },
            onReadFilters: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var oFilter = new sap.ui.model.Filter('Rating', 'EQ', '3');
                oModel.read("/Products", {
                    filters: [oFilter], success: function (odata) {
                        var jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);
                    }, error: function (oError) {
                        console.log(oError);
                    },
                });
            },
            oReadSorter: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                var oSorter = new sap.ui.model.Sorter('Price', true);
                oModel.read("/Products", {
                    sorters: [oSorter], success: function (odata) {
                        var jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);
                    }, error: function (oError) {
                        console.log(oError);
                    },
                });
            },
            oReadParameter: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/Products", {
                    urlParameters: { $skip: 2, $top: 2 }, success: function (odata) {
                        var jModel = new sap.ui.model.json.JSONModel(odata);
                        that.getView().byId("idProducts").setModel(jModel);
                    }, error: function (oError) {
                        console.log(oError);
                    },
                });
            },
            onReadKey: function () {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.read("/Products(8)", {
                    success: function (odata) {
                        var jModel = new sap.ui.model.json.JSONModel({results:[odata]});
                        that.getView().byId("idProducts").setModel(jModel);
                    }, error: function (oError) {
                        console.log(oError);
                    },
                });
            },
            onEdit: function (oEvent) {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.setUseBatch(false);
                if (oEvent.getSource().getText() === "Edit") {
                    oEvent.getSource().setText("Submit");
                    oEvent.getSource().getParent().getParent().getCells()[3].setEditable(true);
                    oEvent.getSource().getParent().getParent().getCells()[2].setEditable(true);
                    oEvent.getSource().getParent().getParent().getCells()[1].setEditable(true);
                }
                else {
                    oEvent.getSource().setText("Edit");
                    oEvent.getSource().getParent().getParent().getCells()[3].setEditable(false);
                    oEvent.getSource().getParent().getParent().getCells()[2].setEditable(false);
                    oEvent.getSource().getParent().getParent().getCells()[1].setEditable(false);

                    var oInput3 = oEvent.getSource().getParent().getParent().getCells()[3].getValue();
                    var oInput2 = oEvent.getSource().getParent().getParent().getCells()[2].getValue();
                    var oInput1 = oEvent.getSource().getParent().getParent().getCells()[1].getValue();

                    var old = oEvent.getSource().getBindingContext().getProperty("ID");

                    oModel.update(
                        "/Products(" + old + ")", { Rating: oInput3 },
                        {
                            success: function (odata) {
                                that.onReadAll();
                            }, error: function (oError) {
                                console.log(oError);
                            },
                        },
                    ),
                        oModel.update(
                            "/Products(" + old + ")", { Price: oInput2 },
                            {
                                success: function (odata) {
                                    that.onReadAll();
                                }, error: function (oError) {
                                    console.log(oError);
                                },
                            },
                        ),
                        oModel.update(
                            "/Products(" + old + ")", { Name: oInput1 },
                            {
                                success: function (odata) {
                                    that.onReadAll();
                                }, error: function (oError) {
                                    console.log(oError);
                                },
                            },
                        );
                }
            },
            onCreate: function (oEvent) {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.setUseBatch(false);
                var oDuplicateData = oEvent.getSource().getBindingContext().getObject();
                oDuplicateData.ID = 10 + oDuplicateData.ID;
                oModel.create("/Products", oDuplicateData, {
                    success: function (odata) {
                        that.onReadAll();
                    }, error: function (oError) {
                        console.log(oError);
                    },
                })
            },
            onDelete: function (oEvent) {
                var that = this;
                var oModel = this.getOwnerComponent().getModel();
                oModel.setUseBatch(false);
                var old = oEvent.getSource().getBindingContext().getProperty("ID")
                oModel.remove("/Products(" + old + ")", {
                    success: function (odata) {
                        that.onReadAll();
                    }, error: function (oError) {
                        console.log(oError);
                    },
                })
            }
        });
    });
