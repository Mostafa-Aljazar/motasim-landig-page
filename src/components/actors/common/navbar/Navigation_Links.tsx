'use client';

import { Box, Stack, Text } from '@mantine/core';
import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import useAuth from '@/hooks/useAuth';
import { managerNavLinks } from '@/content/actor/manager/navLinks';

export default function Navigation_Links() {
  const { user } = useAuth();
  const userId = Number(user?.id) || 0;
  const pathname = usePathname();

  return (
    <Box
      w='100%'
      className='!shadow-xl !border-1 !border-gray-200 rounded-[20px] !overflow-hidden'
    >
      <Stack gap={0}>
        {managerNavLinks(userId).map((link, index) => {
          const isActive = pathname.includes(link.href);
          return (
            <Link
              key={index}
              href={link.href}
              className={cn(
                'flex items-center gap-2 px-2 py-4 text-dark hover:bg-gray-200 transition-colors border-0 border-gray-100',
                index !== managerNavLinks(userId).length - 1 && 'border-b-1',
                isActive &&
                  'bg-gradient-to-l from-primary to-white font-semibold'
              )}
            >
              {link.icon && (
                <link.icon
                  size={20}
                  className={cn(isActive ? '!text-white' : '!text-black')}
                />
              )}
              <Text
                fz={16}
                fw={isActive ? 600 : 400}
                className={cn(
                  '!text-nowrap',
                  isActive ? '!text-white' : '!text-black'
                )}
              >
                {link.label}
              </Text>
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
}
