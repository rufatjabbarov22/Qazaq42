import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import Base_Url from '../config';

function ForgotPassword({ open, handleClose }) {
  const [step, setStep] = React.useState(1); 
  const [email, setEmail] = React.useState('');
  const [reset_token, setResetToken] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [showNewPassword, setShowNewPassword] = React.useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false); 
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [message, setMessage] = React.useState(''); 

  const handleEmailSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(`${Base_Url}auth/forgot-password`, { email });
      setMessage(response.data.message);
      setStep(2); 
    } catch (err) {
      console.error(err);
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      setLoading(false);
      return;
    }

    try {
      const usersResponse = await axios.get(`${Base_Url}users/`);
      const user = usersResponse.data.find((u) => u.email === email);

      if (!user) {
        throw new Error('User not found');
      }

      const response = await axios.post(`${Base_Url}auth/reset-password`, {
      email,
      reset_token,
      new_password: newPassword,
    });

      setMessage('Password reset successfully!');
      handleClose(); 
    } catch (err) {
      console.error(err);
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: step === 1 ? handleEmailSubmit : handleResetSubmit,
      }}
    >
      {step === 1 && (
        <>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            <DialogContentText>
              Enter your account&apos;s email address, and we&apos;ll send you a link to reset your password.
            </DialogContentText>
            <OutlinedInput
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              placeholder="Email address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {message && <DialogContentText sx={{ color: 'green' }}>{message}</DialogContentText>}
            {error && <DialogContentText sx={{ color: 'red' }}>{error}</DialogContentText>}
          </DialogContent>
          <DialogActions sx={{ pb: 3, px: 3 }}>
            <Button onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Continue'}
            </Button>
          </DialogActions>
        </>
      )}
      {step === 2 && (
        <>
          <DialogTitle>Verify OTP and Reset Password</DialogTitle>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            <DialogContentText>
              Enter the OTP sent to your email and your new password below.
            </DialogContentText>
            <OutlinedInput
              autoFocus
              required
              margin="dense"
              id="resetToken"
              name="resetToken"
              placeholder="OTP Code"
              type="text"
              fullWidth
              value={reset_token}
              onChange={(e) => setResetToken(e.target.value)}
            />
            <OutlinedInput
              required
              margin="dense"
              id="newPassword"
              name="newPassword"
              placeholder="New Password"
              type={showNewPassword ? 'text' : 'password'}
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    edge="end"
                    aria-label="toggle password visibility"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <OutlinedInput
              required
              margin="dense"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    aria-label="toggle confirm password visibility"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {message && <DialogContentText sx={{ color: 'green' }}>{message}</DialogContentText>}
            {error && <DialogContentText sx={{ color: 'red' }}>{error}</DialogContentText>}
          </DialogContent>
          <DialogActions sx={{ pb: 3, px: 3 }}>
            <Button onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Reset Password'}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}

ForgotPassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default ForgotPassword;
