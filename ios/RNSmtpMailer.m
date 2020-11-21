
#import "RNSmtpMailer.h"
#import <React/RCTConvert.h>
#import <MailCore/MailCore.h>
@implementation RNSmtpMailer

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}
RCT_EXPORT_MODULE();
RCT_EXPORT_METHOD(sendMail:(NSDictionary *)obj resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSString *mailhost = [RCTConvert NSString:obj[@"mailhost"]];
    NSString *port = [RCTConvert NSString:obj[@"port"]];
    NSString *username = [RCTConvert NSString:obj[@"username"]];
    NSString *password = [RCTConvert NSString:obj[@"password"]];
    NSString *recipients = [RCTConvert NSString:obj[@"recipients"]];
    NSString *subject = [RCTConvert NSString:obj[@"subject"]];
    NSString *body = [RCTConvert NSString:obj[@"htmlBody"]];
    
    NSString *fromName = [RCTConvert NSString:obj[@"fromName"]];
    
    NSString *replyToAddress = [RCTConvert NSString:obj[@"replyTo"]];
    if (replyToAddress == nil) {
        replyToAddress = username;
    }
    
    NSArray *bcc = [RCTConvert NSArray:obj[@"bcc"]];
    NSArray *attachmentPaths = [RCTConvert NSArray:obj[@"attachmentPaths"]];
    
    NSNumber *portNumber = [NSNumber numberWithLongLong:port.longLongValue];
    NSUInteger portInteger = portNumber.unsignedIntegerValue;
    
    MCOSMTPSession *smtpSession = [[MCOSMTPSession alloc] init];
    smtpSession.hostname = mailhost;
    smtpSession.port = portInteger;
    smtpSession.username = username;
    smtpSession.password = password;
    smtpSession.authType = MCOAuthTypeSASLPlain;
    smtpSession.connectionType = MCOConnectionTypeTLS;
    MCOMessageBuilder *builder = [[MCOMessageBuilder alloc] init];
    
    MCOAddress *from = [MCOAddress addressWithDisplayName:fromName
                                                mailbox:username];
                                                
    MCOAddress *to = [MCOAddress addressWithDisplayName:nil
                                              mailbox:recipients];

    MCOAddress *replyTo = [MCOAddress addressWithDisplayName:nil
                                            mailbox:replyToAddress];
    
    if (bcc != nil) {
        NSMutableArray *bccs = [[NSMutableArray alloc] init];
        int bccCount = [bcc count];
        for(int i = 0; i < bccCount; i++){
              MCOAddress *newAddress = [MCOAddress addressWithMailbox:[bcc objectAtIndex:i]];
              [bccs addObject:newAddress];
        }
        [[builder header] setBcc:bccs];
    }

    [[builder header] setFrom:from];
    [[builder header] setTo:@[to]];
    [[builder header] setReplyTo:@[replyTo]];
    [[builder header] setSubject:subject];
    [builder setHTMLBody:body];
    if (attachmentPaths != nil && [attachmentPaths count] > 0) {
        int size = [attachmentPaths count];
          for(int i = 0; i < size; i++){
              [builder addAttachment:[MCOAttachment attachmentWithContentsOfFile:[attachmentPaths objectAtIndex:i]]];
          }
    }
    NSData * rfc822Data = [builder data];
    
    MCOSMTPSendOperation *sendOperation =
    [smtpSession sendOperationWithData:rfc822Data];
    [sendOperation start:^(NSError *error) {
      if (error) {
        NSLog(@"Error sending email: %@", error);
        reject(@"Error",error.localizedDescription,error);
      } else {
        NSLog(@"Successfully sent email!");
        NSDictionary *result = @{@"status": @"SUCCESS"};
        resolve(result);
      }
    }];
}

@end
