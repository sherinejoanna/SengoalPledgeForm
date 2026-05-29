import { createPledgeSchema } from './src/validations/pledge.validation';

const payload = {
  fullName: 'Sherine',
  mobile: '9876543210',
  address: '123 Main St, City',
  pinCode: '600001',
  monthlyQty: '< 1L',
  signature: 'data:image/png;base64,iVBORw0KGgo...',
  pledgeDate: '2026-05-18'
};

try {
  createPledgeSchema.parse(payload);
  console.log('Validation passed!');
} catch (e: any) {
  console.log('Validation failed:', JSON.stringify(e.errors, null, 2));
}
