import RoundedButton from '@components/global/RoundedButton';
import useAuth from '@hooks/useAuth';
import {useNavigation} from '@react-navigation/native';
import {useAppSelector} from '@store/hooks';
import {showToast} from '@utils/Helper';
import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationProps} from 'types/AppTypes';

const OTP_LENGTH = 6;

const EmailVerificationScreen = () => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [sendOtpLoader, setSendOtpLoader] = useState<boolean>(false);
  const [verifyOtpLoader, setVerifyOtpLoader] = useState<boolean>(false);
  const {navigate} =
    useNavigation<NavigationProps<'EmailVerificationScreen'>>();

  const inputs = useRef<TextInput[]>([]);
  const {loggedInUser} = useAppSelector(store => store.user);
  const {sendEmailOtp, verifyEmailOtp} = useAuth();
  console.log('LOGGED IN USER : ', loggedInUser);

  const handleSendOtp = async () => {
    if (!loggedInUser)
      return showToast({title: 'User Not exist', type: 'error'});
    setSendOtpLoader(true);
    const {success} = await sendEmailOtp();
    if (success) {
      setOtpSent(true);
      setTimer(60);
      showToast({title: 'Otp Sent', type: 'success'});
    } else {
      showToast({title: 'Otp Not Sent', type: 'error'});
    }
    setSendOtpLoader(false);
  };

  const handleVerifyOtp = async () => {
    if (!loggedInUser)
      return showToast({title: 'user Not exist', type: 'error'});
    setVerifyOtpLoader(true);
    const {success, message} = await verifyEmailOtp(otp.join(''));
    if (success) {
      setOtpSent(true);
      setTimer(60);
      showToast({title: 'Otp Verified', type: 'success'});
      navigate('CompleteProfileScreen', {user: loggedInUser});
    } else {
      showToast({title: message ?? 'Otp Not Verified', type: 'error'});
    }
    setVerifyOtpLoader(false);
  };

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (otp[index] === '' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const isOtpComplete = otp.every(d => d !== '');

  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.icon}>📩</Text>
        <Text style={styles.title}>Email Verification</Text>
        <Text style={styles.subtitle}>
          Secure your account by verifying your email address
        </Text>
      </View>

      {!otpSent && (
        <RoundedButton
          onPress={handleSendOtp}
          title="Send Otp"
          loading={sendOtpLoader}
          disabled={sendOtpLoader}
        />
      )}

      {otpSent && (
        <>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputs.current[index] = ref!)}
                style={[styles.otpBox, digit && styles.otpBoxFilled]}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={value => handleChange(value, index)}
                onKeyPress={({nativeEvent}) =>
                  nativeEvent.key === 'Backspace' && handleBackspace(index)
                }
              />
            ))}
          </View>

          <Text style={styles.timerText}>
            {timer > 0
              ? `Resend code in 00:${timer}`
              : 'Didn’t receive the code?'}
          </Text>

          <TouchableOpacity disabled={timer > 0} onPress={handleSendOtp}>
            <Text style={[styles.resendText, timer > 0 && {opacity: 0.4}]}>
              Resend OTP
            </Text>
          </TouchableOpacity>

          <RoundedButton
            onPress={handleVerifyOtp}
            title="Verify Otp"
            loading={verifyOtpLoader}
            disabled={verifyOtpLoader}
            style={[styles.primaryButton, !isOtpComplete && {opacity: 0.5}]}
          />
        </>
      )}

      <Text style={styles.helpText}>
        Check spam or promotions folder if you don’t see the email.
      </Text>
    </KeyboardAvoidingView>
  );
};

export default EmailVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEF2F2',
    padding: 24,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
  },
  icon: {
    fontSize: 42,
    marginBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#7F1D1D',
  },
  subtitle: {
    fontSize: 15,
    color: '#991B1B',
    marginTop: 6,
    lineHeight: 22,
  },
  primaryButton: {
    height: 52,
    backgroundColor: '#DC2626',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpBox: {
    width: 46,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCA5A5',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#7F1D1D',
    backgroundColor: '#FFF',
  },
  otpBoxFilled: {
    borderColor: '#DC2626',
  },
  timerText: {
    fontSize: 13,
    color: '#991B1B',
    textAlign: 'center',
  },
  resendText: {
    color: '#DC2626',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  helpText: {
    fontSize: 12,
    color: '#9F1239',
    textAlign: 'center',
    marginTop: 30,
  },
});
