import { Card, Emoji } from 'components';
import * as React from 'react';
import { getTimeString } from 'utils';

const StatCard: React.FC = ({ children }) => (
  <Card className="flex flex-col md:flex-row text-xl md:text-2xl justify-between items-center">
    {children}
  </Card>
)

const StatCardHeader: React.FC = ({ children }) => (
  <h3 className="text-3xl">{children}</h3>
)
const StatCardBody: React.FC = ({ children }) => (
  <p className="text-right m-0">{children}</p>
)

export interface CountStatCardProps {
  count: number
}
const CountStatCard = React.memo<CountStatCardProps>(({ count }) => (
  <StatCard>
    <StatCardHeader>
      <Emoji symbol="🍅" label="tomato" />
    </StatCardHeader>
    <StatCardBody>{count}</StatCardBody>
  </StatCard>
))
CountStatCard.displayName = 'CountStatCard'

export interface TimeStatCardProps {
  ms: number
  type: 'work' | 'break'
}

const TimeStatCard = React.memo<TimeStatCardProps>(({ ms, type }) => (
  <StatCard>
    <StatCardHeader>
      {type === 'work' ? (
        <Emoji symbol="🏗" label="crane" />
      ) : (
        <Emoji symbol="☕️" label="coffee" />
      )}
    </StatCardHeader>
    <StatCardBody>{getTimeString(ms)}</StatCardBody>
  </StatCard>
))
TimeStatCard.displayName = 'TimeStatCard'

export { CountStatCard, TimeStatCard }
