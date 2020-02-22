// components/Empty/empty.js
Component({
  options: {
    multipleSlots: true
  },
  data: {
    modalShow: false,
    animation: ''
  },

  ready: function () {
    this.animation = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
  },

  methods: {
    openModal() {
      if (!this.data.modalShow) {
        this._toggleModal();
      }
    },
    hideModal() {
      if (this.data.modalShow) this._toggleModal();
    },
    _toggleModal() {
      let isShow = !this.data.modalShow;
      this._executeAnimation(isShow);
    },
    _executeAnimation(isShow) {
      let animation = this.animation;
      if (isShow) {
        animation.opacity(1).step();
        this.setData({
          animationData: animation.export(),
          modalShow: true
        })
        setTimeout(function () {
          animation.opacity(1).step()
          this.setData({
            animationData: animation.export()
          })
        }.bind(this), 50)
      } else {
        animation.opacity(0).step()
        this.setData({
          animationData: animation.export()
        })

        setTimeout(function () {
          this.setData({
            modalShow: isShow
          })
        }.bind(this), 300)
      }
    }
  }
})



