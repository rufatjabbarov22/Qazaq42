"""Making User Optional for Device

Revision ID: 525e92433847
Revises: f6cc9d8d6629
Create Date: 2024-11-09 00:46:05.596962

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '525e92433847'
down_revision: Union[str, None] = 'f6cc9d8d6629'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_foreign_key(None, 'districts', 'countries', ['country_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'districts', type_='foreignkey')
    # ### end Alembic commands ###
