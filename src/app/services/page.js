// src/app/services/page.js

import React from 'react';
import { redirect } from 'next/navigation';

export default function ServicesRedirect() {
  redirect('/website/services');
  return null;
}
