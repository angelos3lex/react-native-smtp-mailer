
#import "RNSmtpMailer.h"

@implementation RNSmtpMailer

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE(sendEmail:(NSDictionary *)obj ,sendEmailWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *mailhost = [RCTConvert NSString:obj[@"mailhost"]];
    NSString *port = [RCTConvert NSString:obj[@"port"]];
    NSString *username = [RCTConvert NSString:obj[@"username"]];
    NSString *password = [RCTConvert NSString:obj[@"password"]];
    NSString *from = [RCTConvert NSString:obj[@"from"]];
    NSString *recipients = [RCTConvert NSString:obj[@"recipients"]];
    NSString *subject = [RCTConvert NSString:obj[@"subject"]];
    NSString *body = [RCTConvert NSString:obj[@"htmlBody"]];
    BOOL ssl = [RCTConvert BOOL:obj[@"ssl"]];
    NSArray *attachmentPaths = [RCTConvert NSArray:obj[@"attachmentPaths"]];
    NSArray *attachmentNames = [RCTConvert NSArray:obj[@"attachmentNames"]];
    NSArray *attachmentTypes = [RCTConvert NSArray:obj[@"attachmentTypes"]];

    RCTLogInfo(@"start sending email!");
    if (ssl) {
        resolve(@(YES));
    } else {
        resolve(@(NO));
    }
}

@end
  