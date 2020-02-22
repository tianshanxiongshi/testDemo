Component({
    externalClasses: ['i-class', 'i-class-mask', 'i-class-header'],

    options: {
        multipleSlots: true
    },

    properties: {
        visible: {
            type: Boolean,
            value: false
        },
        maskClosable: {
            type: Boolean,
            value: true
        }
    },

    methods: {
        handleClickMask () {
            if (!this.data.maskClosable) return;
            this.handleClickCancel();
        },
        handleClickCancel () {
            this.triggerEvent('cancel');
        }
    }
});
