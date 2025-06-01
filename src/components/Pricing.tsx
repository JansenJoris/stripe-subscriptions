import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check } from 'lucide-react';
import Link from 'next/link';
import PaymentLink from './PaymentLink';

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
  href: string;
  billing: string;
  paymentLink?: string;
}

const pricingList: PricingProps[] = [
  {
    title: 'Gratis',
    popular: 0,
    price: 0,
    description:
      'Voor kleine ondernemingen die sporadis nieuw personeel aanwerft',
    buttonText: 'Adverteer',
    benefitList: ['1 Vacature', '30 dagen actief', 'Opname Nieuwsbrief'],
    href: '/api/auth/login',
    billing: '/starter',
  },
  {
    title: 'Starter',
    popular: 1,
    price: 10,
    description:
      'Voor de Kmo die regelmatig Flexers nodig heeft. Max 1 vacature online per onderneming. Vacature kan je aanpassen aan uw noden.',
    buttonText: 'Adverteer',
    benefitList: [
      '1 Vacature',
      'Onbeperkte tijd online',
      'Online Nieuwsbrief',
      'Instagram',
      'Facebook',
    ],
    href: '/api/auth/login',
    paymentLink: process.env.STRIPE_MONTHLY_PLAN_LINK,
    billing: '/month',
  },
  {
    title: 'Vip',
    popular: 0,
    price: 99,
    description:
      'Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.',
    buttonText: 'Adverteer',
    benefitList: [
      '1 Account',
      'Onbeperkt Vacatures',
      'Onbeperkte tijd online',
      'Online Nieuwsbrief',
      'Instagram',
      'Facebook',
    ],
    href: '/api/auth/login',
    paymentLink: process.env.STRIPE_YEARLY_PLAN_LINK,
    billing: '/year',
  },
];

export const Pricing = () => {
  return (
    <section id='pricing' className='container py-24 sm:py-32'>
      <h2 className='text-3xl md:text-4xl font-bold text-center'>
        Adverteer
        <span className='bg-gradient-to-b from-[#667EEA] to-[#764BA2] uppercase text-transparent bg-clip-text'>
          {' '}
          Onbeperkt{' '}
        </span>
        op Flexi-Job.nu
      </h2>
      <h3 className='text-xl text-center text-muted-foreground pt-4 pb-8'></h3>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {pricingList.map((pricing: PricingProps) => (
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES
                ? 'drop-shadow-xl shadow-black/10 dark:shadow-white/10'
                : ''
            }
          >
            <CardHeader>
              <CardTitle className='flex item-center justify-between'>
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge variant='secondary' className='text-sm text-primary'>
                    Meest gekozen
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className='text-3xl font-bold'>€{pricing.price}</span>
                <span className='text-muted-foreground'>
                  {' '}
                  {pricing.billing}
                </span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <PaymentLink
                href={pricing.href}
                text={pricing.buttonText}
                paymentLink={pricing.paymentLink}
              />
            </CardContent>

            <hr className='w-4/5 m-auto mb-4' />

            <CardFooter className='flex'>
              <div className='space-y-4'>
                {pricing.benefitList.map((benefit: string) => (
                  <span key={benefit} className='flex'>
                    <Check className='text-purple-500' />{' '}
                    <h3 className='ml-2'>{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
