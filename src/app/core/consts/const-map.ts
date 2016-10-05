
export const constMap = {
  BillboardType: {
    TBillboardUnknow: 0,
    TBillboardAdSlide: 1,
    TBillboardHome: 2,
    TBillboardNews: 3
  },
  CodedError: {
    Error: 0,
    Unauthorized: 1,
    SonyFlakeTimeout: 2,
    InvalidUrlParam: 3,
    InvalidPostBody: 4,
    InvalidPhoneFormat: 5,
    RebindSamePhone: 6,
    PhoneOccupied: 7,
    PhoneBindRequired: 8,
    UserNotFound: 9,
    DbFailed: 10,
    CaptchaRejected: 11,
    UpdateWxOrderStateFailed: 12,
    SystemModeNotAllowed: 13,
    InvalidRefreshToken: 14,
    NoRefreshToken: 15,
    NoNeedRefreshToken: 16,
    NoAccessToken: 17,
    InvalidAccessToken: 18,
    GenCaptchaFailed: 19,
    RemoteHTTPFailed: 20,
    InvalidTokenSubject: 21,
    InvalidTokenExpires: 22,
    InvalidSignAlg: 23,
    InvalidClaimId: 24,
    InvalidUserID: 25,
    Forbidden: 26,
    RetrySmsFailed: 27,
    SendSmsError: 28,
    SendSmsFailed: 29,
    SmsVerifyFailed: 30,
    InvalidProductId: 31,
    InvalidSkuStock: 32,
    InvalidSkuId: 33,
    InvalidAttrId: 34,
    InvalidAttrLen: 35,
    InvalidGroupbuyId: 36,
    InvalidCheckoutTotal: 37,
    InvalidCheckoutFreight: 38,
    InvalidPaykey: 39,
    PaykeyNeedBeSet: 40,
    NotEnoughMoney: 41,
    NotEnoughPoints: 42,
    OnlyAbcOrPoints: 43,
    NoAbcOrPoints: 44,
    InvalidPayAmount: 45,
    InvalidPayType: 46,
    NotNopayState: 47,
    NoWayToPaidState: 48,
    NoWayToTargetState: 49,
    NoPermToState: 50,
    OrderClosed: 51,
    OrderCloseNeeded: 52,
    OrderCompleteTimeout: 53,
    OrderEvalTimeout: 54,
    OrderItemNotFound: 55,
    NotPrepayOrder: 56,
    WxPayNotCompleted: 57,
    WxRefundNotCompleted: 58,
    WxOrderNotExist: 59,
    WxOrderAlreadyClosed: 60,
    WxOrderCloseFailed: 61,
    WxOrderAlreadyPaid: 62,
    WxOrderCloseIn5Min: 63,
    WxSystemFailed: 64,
    InvalidCashPrepaid: 65,
    InvalidPrepayPayload: 66,
    ApiImplementFailed: 67,
    WxUserAbnormal: 68,
    ParseWxTotalFeeFailed: 69,
    WithdrawFailed: 70,
    VipRebateSubIDsLen: 71,
    VipRebateSubIDsHas0: 72,
    VipRebateSubIDsNoRow: 73,
    NotVip: 74,
    VipBalanceEmpty: 75,
    VipRebateSubTotalSmall: 76,
    InvalidRebateType: 77,
    AmountLimit: 78
  },
  OrderState: {
    TOrderStateUnknown: 0,
    TOrderStateNopay: 1,
    TOrderStatePrepaid: 2,
    TOrderStatePaid: 3,
    TOrderStateCanceled: 4,
    TOrderStatePicking: 5,
    TOrderStateDelivered: 6,
    TOrderStateReturnStarted: 7,
    TOrderStateReturning: 8,
    TOrderStateReturned: 9,
    TOrderStateRejecting: 10,
    TOrderStateRejectBack: 11,
    TOrderStateRejectRefound: 12,
    TOrderStateCompleted: 13,
    TOrderStateEvalStarted: 14,
    TOrderStateEvaled: 15,
    TOrderStateHistory: 16
  },
  TradeState: {
    UNKNOWN: 0,
    NOTPAY: 1,
    SUCCESS: 2,
    REFUND: 3,
    CLOSED: 4,
    REVOKED: 5,
    USERPAYING: 6,
    PAYERROR: 7
  },
  UserCashType: {
    TUserCashUnknown: 0,
    TUserCashPrepay: 1,
    TUserCashPrepayBack: 2,
    TUserCashTrade: 3,
    TUserCashRefund: 4,
    TUserCashPreWithdraw: 5,
    TUserCashWithdraw: 6,
    TUserCashReward: 7,
    TUserCashRebate: 8,
    TUserCashStoreRebate: 9
  },
  VipRebateType: {
    TVipRebateUnknown: 0,
    TVipRebateRebate: 1,
    TVipRebateReward: 2
  },
  VpnType: {
    TVpnNormal: 0,
    TVpnPoints: 1,
    TVpnVip: 2
  }
};

export const consts = {
  BillboardType: Object.keys(constMap.BillboardType),
  CodedError: Object.keys(constMap.CodedError),
  OrderState: Object.keys(constMap.OrderState),
  TradeState: Object.keys(constMap.TradeState),
  UserCashType: Object.keys(constMap.UserCashType),
  VipRebateType: Object.keys(constMap.VipRebateType),
  VpnType: Object.keys(constMap.VpnType),
};

export const constTransMap = {
  OrderState: {
    0: '未知状态', 1: '待付款', 2: '支付中', 3: '待发货', 4: '已关闭', 5: '发货中', 6: '已发货', 7: '已申请退款', 8: '退货中', 9: '已退款', 10: '拒收货', 11: '拒收已退回', 12: '拒收已退款', 13: '待评价', 14: '评价中', 15: '已评价', 16: '已评价'
  },
  UserCashType: {
    0: '未知类型', 1: '预付款', 2: '预付款退回', 3: '交易', 4: '退款', 5: '预提现', 6: '提现', 7: '奖励', 8: '返利', 9: '返利(店铺推荐)'
  }
};
