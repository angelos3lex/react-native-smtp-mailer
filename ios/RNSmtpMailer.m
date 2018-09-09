
#import "RNSmtpMailer.h"

@implementation RNSmtpMailer

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE(sendEmail:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    if (true) {
        resolve(@(YES));
    } else {
        resolve(@(NO));
    }
}

@end
  