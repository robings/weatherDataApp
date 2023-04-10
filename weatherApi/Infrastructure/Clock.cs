using System;

namespace weatherApi.Infrastructure
{
    public class Clock : IClock
    {
        private Func<DateTime> _nowProvider;

        public Clock(Func<DateTime> nowProvider)
        {
            _nowProvider = nowProvider;
        }

        public DateTime Now() => _nowProvider();
    }
}

